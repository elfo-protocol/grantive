use anchor_lang::prelude::*;

pub mod error;
pub mod instructions;
pub mod state;
pub mod constants;

use instructions::*;

declare_id!("43NuqRW7s1uCCMndhvP6PTmsSohpgFP43g7bJy45Kwqk");

#[program]
pub mod grantive {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        instructions::initialize::handler(ctx)
    }

    pub fn init_creator(
        ctx: Context<InitializeCreator>,
        creator_name: String,
        creator_amount: i64,
        creator_data_ipfs: String
    ) -> Result<()> {
        instructions::init_creator::handler(ctx, creator_name, creator_amount, creator_data_ipfs)
    }

    pub fn create_post(
        ctx: Context<CreatePost>,
        title: String,
        content_ipfs: String,
        subscriber_only: bool,
    ) -> Result<()> {
        instructions::create_post::handler(ctx,title, content_ipfs, subscriber_only)
    }
}
