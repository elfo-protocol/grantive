use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Creator is not initialized.")]
    CreatorNotInitialized,
}
