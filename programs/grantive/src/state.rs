use anchor_lang::prelude::*;

use crate::constants::{PUBKEY_SIZE, MAXIMUM_CREATOR_ACCOUNTS, MAXIMUM_POSTS_PER_CREATOR};

#[account]
pub struct Grantive {
    pub bump: u8,
    pub has_already_been_initialized: bool,
    pub authority: Pubkey,

    // This contains PubKeys of all the creator accounts
    pub creator_accounts: Vec<Pubkey>,
}
impl Grantive {
    pub fn space() -> usize {
        8 + // discriminator
        1 + // bump
        1 + // has_already_been_initialized
        PUBKEY_SIZE + // authority
        4 + (PUBKEY_SIZE * MAXIMUM_CREATOR_ACCOUNTS) // creator_accounts
    }
}

#[account]
pub struct Creator {
    pub bump: u8,
    pub has_already_been_initialized: bool,
    pub authority: Pubkey,
    pub name: String,
    pub data_id: String,
    pub subscription_plan: Pubkey,

    // This contains PubKeys of all the posts the creator has made
    pub posts: Vec<Pubkey>,
    pub last_post_index: i64
}
impl Creator {
    pub fn space(name: &str, data_id: &str) -> usize {
        8 + // discriminator
        1 + // bump
        1 + // has_already_been_initialized
        PUBKEY_SIZE + // authority
        4 + name.len() + //name
        4 + data_id.len() + //data_id
        PUBKEY_SIZE + // subscription_plan
        4 + (PUBKEY_SIZE * MAXIMUM_POSTS_PER_CREATOR) + // posts
        8 // last_post_index
    }
}

#[account]
pub struct CreatorPost {
    pub bump: u8,
    pub index: i64,
    pub has_already_been_initialized: bool,
    pub creator: Pubkey,
    pub title: String,
    pub content_data: String,
    pub published_on: i64,

    // if the post is only accessible by subscriber
    pub subscriber_only: bool,
}
impl CreatorPost {
    pub fn space(title: &str, content_data: &str) -> usize {
        8 + // discriminator
        1 + // bump
        8 + // index
        1 + // has_already_been_initialized
        PUBKEY_SIZE + // creator
        4 + title.len() + //title
        4 + content_data.len() + //content_data
        8 + // published_on
        1 // subscriber_only
    }
}