use crate::error::ErrorCode::*;
use crate::state::*;

use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreatePost<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        seeds = [b"post", creator.key().as_ref(), (creator.last_post_index + 1).to_string().as_ref()],
        bump,
        space=8+2000 //todo: calculate correct space
    )]
    pub post: Box<Account<'info, CreatorPost>>,

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

pub fn handler(ctx: Context<CreatePost>,title: String, content_ipfs: String, subscriber_only: bool) -> Result<()> {
    let creator = &mut ctx.accounts.creator;
    let post = &mut ctx.accounts.post;
    post.bump = *ctx.bumps.get("post").unwrap();
    post.has_already_been_initialized = true;
    post.title = title;
    post.content_ipfs = content_ipfs;
    post.creator = creator.key();
    post.subscriber_only = subscriber_only;

    let clock = &ctx.accounts.clock;
    let current_time = clock.unix_timestamp;

    post.published_on = current_time;

    creator.posts.push(post.key());
    creator.last_post_index = creator.last_post_index + 1;
    post.index = creator.last_post_index;
    

    Ok(())
}
