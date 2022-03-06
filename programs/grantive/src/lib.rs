use anchor_lang::prelude::*;

pub mod error;
pub mod instructions;
pub mod state;

use instructions::*;

declare_id!("HNMPfCiDuFHtV5ckwACLzY9MjbpAzrXpbdLgqpa4BHbH");

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
    ) -> Result<()> {
        instructions::init_creator::handler(ctx, creator_name, creator_amount)
    }

    pub fn create_post(
        ctx: Context<CreatePost>,
        content: String,
        subscriber_only: bool,
    ) -> Result<()> {
        instructions::create_post::handler(ctx, content, subscriber_only)
    }
}
