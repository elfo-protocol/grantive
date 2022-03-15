use anchor_lang::prelude::*;

pub const PUBKEY_SIZE: usize = std::mem::size_of::<Pubkey>();

// these constants needs to be changed when protocol gets bigger
pub const MAXIMUM_CREATOR_ACCOUNTS :usize = 50;
pub const MAXIMUM_POSTS_PER_CREATOR: usize = 30;
