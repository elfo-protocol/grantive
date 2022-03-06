use crate::state::*;
use anchor_lang::prelude::*;
use subrina_protocol::cpi::accounts::CreateSubscriptionPlan;
use subrina_protocol::program::SubrinaProtocol;
use subrina_protocol::state::{Protocol, SubscriptionPlan, SubscriptionPlanAuthor};

use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

#[derive(Accounts)]
pub struct InitializeCreator<'info> {
    #[account(
        init,
        payer = authority,
        seeds = [b"creator", authority.key().as_ref()],
        bump,
        space=8+1000 //todo: calculate correct space
    )]
    pub creator: Box<Account<'info, Creator>>,

    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = authority,
    )]
    pub creator_payment_account: Box<Account<'info, TokenAccount>>,

    #[account(mut)]
    pub protocol_state: Box<Account<'info, Protocol>>,

    #[account(mut)]
    pub subscription_plan: Box<Account<'info, SubscriptionPlan>>,

    #[account(mut)]
    pub subscription_plan_author: Box<Account<'info, SubscriptionPlanAuthor>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    // #[account(address = mint::USDC @ ErrorCode::InvalidMint)]
    pub mint: Box<Account<'info, Mint>>,

    pub protocol: Program<'info, SubrinaProtocol>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(
    ctx: Context<InitializeCreator>,
    creator_name: String,
    creator_amount: i64,
) -> Result<()> {
    let creator = &mut ctx.accounts.creator;
    creator.bump = *ctx.bumps.get("creator").unwrap();
    creator.has_already_been_initialized = true;
    creator.authority = ctx.accounts.authority.key();

    // create subscription plan for creator

    let cpi_program = ctx.accounts.protocol.to_account_info();

    let cpi_accounts = CreateSubscriptionPlan {
        token_program: ctx.accounts.token_program.to_account_info(),
        associated_token_program: ctx.accounts.associated_token_program.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
        rent: ctx.accounts.rent.to_account_info(),
        system_program: ctx.accounts.system_program.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        protocol_state: ctx.accounts.protocol_state.to_account_info(),
        subscription_plan_payment_account: ctx.accounts.creator_payment_account.to_account_info(),
        subscription_plan: ctx.accounts.subscription_plan.to_account_info(),
        subscription_plan_author: ctx.accounts.subscription_plan_author.to_account_info(),
    };

    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    subrina_protocol::cpi::create_subscription_plan(
        cpi_ctx,
        creator_name,
        creator_amount,
        30 * 86400,
        2,
    )?;

    creator.subscription_plan = ctx.accounts.subscription_plan.key();
    Ok(())
}
