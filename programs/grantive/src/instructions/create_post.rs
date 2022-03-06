use crate::error::ErrorCode::*;
use crate::state::*;

use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(
        init,
        payer = authority,
        space=8+9000 //todo: calculate correct space
    )]
    pub post: Box<Account<'info, CreatorPost>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"creator", authority.key().as_ref()],
        bump = creator.bump,
        has_one = authority,
        constraint = creator.has_already_been_initialized @CreatorNotInitialized
    )]
    pub creator: Box<Account<'info, Creator>>,

    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    pub clock: Sysvar<'info, Clock>,
}

pub fn handler(ctx: Context<CreatePost>, content: String, subscriber_only: bool) -> Result<()> {
    let creator = &mut ctx.accounts.creator;
    let post = &mut ctx.accounts.post;

    post.has_already_been_initialized = true;
    post.content = content;
    post.bump = *ctx.bumps.get("post").unwrap();
    post.creator = creator.key();
    post.subscriber_only = subscriber_only;

    Ok(())
}
