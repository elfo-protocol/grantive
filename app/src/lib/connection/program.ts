import { GRANTIVE_PROGRAM_ID } from '../constants'
import { Program } from '@project-serum/anchor'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Grantive } from '../../types/grantive'
import { idl } from '../../types/idl'
import { getProvider } from './provider'

export const getProgram = (wallet: AnchorWallet) => {
    return new Program<Grantive>(idl as Grantive, GRANTIVE_PROGRAM_ID, getProvider(wallet))
}
