export type Grantive = {
    version: '0.1.0';
    name: 'grantive';
    instructions: [
        {
            name: 'initialize';
            accounts: [
                {
                    name: 'grantiveState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'rent';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [];
        },
        {
            name: 'initCreator';
            accounts: [
                {
                    name: 'creator';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'grantiveState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'creatorPaymentAccount';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'protocolState';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'subscriptionPlan';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'subscriptionPlanAuthor';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'authority';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'mint';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'protocol';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'associatedTokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'tokenProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'rent';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'creatorName';
                    type: 'string';
                },
                {
                    name: 'creatorAmount';
                    type: 'i64';
                },
                {
                    name: 'creatorDataId';
                    type: 'string';
                }
            ];
        },
        {
            name: 'createPost';
            accounts: [
                {
                    name: 'authority';
                    isMut: true;
                    isSigner: true;
                },
                {
                    name: 'post';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'creator';
                    isMut: true;
                    isSigner: false;
                },
                {
                    name: 'systemProgram';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'rent';
                    isMut: false;
                    isSigner: false;
                },
                {
                    name: 'clock';
                    isMut: false;
                    isSigner: false;
                }
            ];
            args: [
                {
                    name: 'title';
                    type: 'string';
                },
                {
                    name: 'contentData';
                    type: 'string';
                },
                {
                    name: 'subscriberOnly';
                    type: 'bool';
                }
            ];
        }
    ];
    accounts: [
        {
            name: 'grantive';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'bump';
                        type: 'u8';
                    },
                    {
                        name: 'hasAlreadyBeenInitialized';
                        type: 'bool';
                    },
                    {
                        name: 'authority';
                        type: 'publicKey';
                    },
                    {
                        name: 'creatorAccounts';
                        type: {
                            vec: 'publicKey';
                        };
                    }
                ];
            };
        },
        {
            name: 'creator';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'bump';
                        type: 'u8';
                    },
                    {
                        name: 'hasAlreadyBeenInitialized';
                        type: 'bool';
                    },
                    {
                        name: 'authority';
                        type: 'publicKey';
                    },
                    {
                        name: 'name';
                        type: 'string';
                    },
                    {
                        name: 'dataId';
                        type: 'string';
                    },
                    {
                        name: 'subscriptionPlan';
                        type: 'publicKey';
                    },
                    {
                        name: 'posts';
                        type: {
                            vec: 'publicKey';
                        };
                    },
                    {
                        name: 'lastPostIndex';
                        type: 'i64';
                    }
                ];
            };
        },
        {
            name: 'creatorPost';
            type: {
                kind: 'struct';
                fields: [
                    {
                        name: 'bump';
                        type: 'u8';
                    },
                    {
                        name: 'index';
                        type: 'i64';
                    },
                    {
                        name: 'hasAlreadyBeenInitialized';
                        type: 'bool';
                    },
                    {
                        name: 'creator';
                        type: 'publicKey';
                    },
                    {
                        name: 'title';
                        type: 'string';
                    },
                    {
                        name: 'contentData';
                        type: 'string';
                    },
                    {
                        name: 'publishedOn';
                        type: 'i64';
                    },
                    {
                        name: 'subscriberOnly';
                        type: 'bool';
                    }
                ];
            };
        }
    ];
    errors: [
        {
            code: 6000;
            name: 'CreatorNotInitialized';
            msg: 'Creator is not initialized.';
        }
    ];
};

export const IDL: Grantive = {
    version: '0.1.0',
    name: 'grantive',
    instructions: [
        {
            name: 'initialize',
            accounts: [
                {
                    name: 'grantiveState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [],
        },
        {
            name: 'initCreator',
            accounts: [
                {
                    name: 'creator',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'grantiveState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'creatorPaymentAccount',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'protocolState',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'subscriptionPlan',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'subscriptionPlanAuthor',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'authority',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'mint',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'protocol',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'associatedTokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'tokenProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'creatorName',
                    type: 'string',
                },
                {
                    name: 'creatorAmount',
                    type: 'i64',
                },
                {
                    name: 'creatorDataId',
                    type: 'string',
                },
            ],
        },
        {
            name: 'createPost',
            accounts: [
                {
                    name: 'authority',
                    isMut: true,
                    isSigner: true,
                },
                {
                    name: 'post',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'creator',
                    isMut: true,
                    isSigner: false,
                },
                {
                    name: 'systemProgram',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'rent',
                    isMut: false,
                    isSigner: false,
                },
                {
                    name: 'clock',
                    isMut: false,
                    isSigner: false,
                },
            ],
            args: [
                {
                    name: 'title',
                    type: 'string',
                },
                {
                    name: 'contentData',
                    type: 'string',
                },
                {
                    name: 'subscriberOnly',
                    type: 'bool',
                },
            ],
        },
    ],
    accounts: [
        {
            name: 'grantive',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'hasAlreadyBeenInitialized',
                        type: 'bool',
                    },
                    {
                        name: 'authority',
                        type: 'publicKey',
                    },
                    {
                        name: 'creatorAccounts',
                        type: {
                            vec: 'publicKey',
                        },
                    },
                ],
            },
        },
        {
            name: 'creator',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'hasAlreadyBeenInitialized',
                        type: 'bool',
                    },
                    {
                        name: 'authority',
                        type: 'publicKey',
                    },
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'dataId',
                        type: 'string',
                    },
                    {
                        name: 'subscriptionPlan',
                        type: 'publicKey',
                    },
                    {
                        name: 'posts',
                        type: {
                            vec: 'publicKey',
                        },
                    },
                    {
                        name: 'lastPostIndex',
                        type: 'i64',
                    },
                ],
            },
        },
        {
            name: 'creatorPost',
            type: {
                kind: 'struct',
                fields: [
                    {
                        name: 'bump',
                        type: 'u8',
                    },
                    {
                        name: 'index',
                        type: 'i64',
                    },
                    {
                        name: 'hasAlreadyBeenInitialized',
                        type: 'bool',
                    },
                    {
                        name: 'creator',
                        type: 'publicKey',
                    },
                    {
                        name: 'title',
                        type: 'string',
                    },
                    {
                        name: 'contentData',
                        type: 'string',
                    },
                    {
                        name: 'publishedOn',
                        type: 'i64',
                    },
                    {
                        name: 'subscriberOnly',
                        type: 'bool',
                    },
                ],
            },
        },
    ],
    errors: [
        {
            code: 6000,
            name: 'CreatorNotInitialized',
            msg: 'Creator is not initialized.',
        },
    ],
};
