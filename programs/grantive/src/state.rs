use anchor_lang::prelude::*;

#[account]
pub struct Grantive {
    pub bump: u8,
    pub has_already_been_initialized: bool,
    pub authority: Pubkey,

    // This contains PubKeys of all the creator accounts
    pub creator_accounts: Vec<Pubkey>,
}

#[account]
pub struct Creator {
    pub bump: u8,
    pub has_already_been_initialized: bool,
    pub authority: Pubkey,
    pub published_on: i64,
    pub subscription_plan: Pubkey,

    // This contains PubKeys of all the posts the creator has made
    pub posts: Vec<Pubkey>,
}

#[account]
pub struct CreatorPost {
    pub bump: u8,
    pub has_already_been_initialized: bool,
    pub creator: Pubkey,

    // if the post is only accessible by subscriber
    pub subscriber_only: bool,

    // post content
    pub content: String,
}
