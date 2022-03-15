use crate::state::*;
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        seeds = [b"grantive_state"],
        bump,
        space= Grantive::space()
    )]
    pub grantive_state: Box<Account<'info, Grantive>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<Initialize>) -> Result<()> {
    let grantive_state = &mut ctx.accounts.grantive_state;
    grantive_state.bump = *ctx.bumps.get("grantive_state").unwrap();
    grantive_state.has_already_been_initialized = true;
    grantive_state.authority = ctx.accounts.authority.key();
    grantive_state.creator_accounts = vec![];
    Ok(())
}
