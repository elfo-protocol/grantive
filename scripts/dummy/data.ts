export interface IData {
    name: string;
    description: string;
    img: string;
    posts: IPost[]
}

export interface IPost {
    title: string;
    paragraphs: string[];
    video: string;
    subscriberOnly: boolean;
}

export const data: IData[] = [
    {
        name: "True Crime Obsessed ",
        description: "podcasts of the non-garbage variety",
        img: "https://static.wixstatic.com/media/0fec9d_a1ad95ba52fc4f04922471ca69aea9fb~mv2.png/v1/fill/w_1681,h_975,al_c/0fec9d_a1ad95ba52fc4f04922471ca69aea9fb~mv2.png",
        posts: [
            {
                title: "The Show Up | The It’s Criminal Edition",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=hUe3cWZFICs",
                paragraphs: [
                    "Over the past few years, swarms of true crime enthusiasts have gathered online in extraordinary ways. From podcasts to documentaries, fans are tuning in more than ever to experience their favorite hosts shine light on the darkest stories. Join us to get the inside scoop about the cases that made the headlines and explore the ones that have yet to be told"
                ]
            },
            {
                title: "True Crime Obsessed Teaser",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=AcDrN1y1Qqc",
                paragraphs: [
                    "We're the true crime/comedy podcast you NEED in your life, recapping true crime documentaries with humor and sass. ",
                    "Check us out at www.truecrimeobsessed.com and subscribe to True Crime Obsessed wherever you get your podcasts."
                ]
            },
        ]
    },
    {
        name: "Chapo Trap House",
        description: "American political podcast",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/82/DEA_Patch_-_Cocaine_Intelligence_Unit.png",
        posts: [
            {
                title: "608 - The World’s Mack (3/7/22)",
                subscriberOnly: true,
                video: "",
                paragraphs: [
                    "We are back from the first leg of our tour of the South and here to look at the responses to war in Ukraine brewing in the foreign policy op-ed world",
                    "Tickets to Houston, Dallas and New Orleans shows still available at: https://www.chapotraphouse.com/live"
                ]
            },
            {
                title: "Chapo Trap House - McConnell Perfect Politician Of Our Age",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=8GucVKJxXnk",
                paragraphs: [
                    "He is willing to punt the ball",
                    "He is willing to defang the senate"
                ]

            },
        ]
    },
    {
        name: "Yagami Yato ",
        description: "Vocal Artistry, ASMR, And Interactive fiction",
        img: "https://i.redd.it/ixhldvqzulg71.jpg",
        posts: [
            {
                title: "\"Flirty Devil..\" Extra Spicy Ver",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=YJ4VJAOselc",
                paragraphs: [
                    "Yagami Yato is a voice actor who makes asmr's of anime men and rarely, anime women"
                ]
            },
            {
                title: "\"Like Lightning In A Kiss..\" A Jealous Possessive Denki x Listener Spicy Ver",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=voRN02nHcQc",
                paragraphs: [
                    "It's what makes my heart race and my life feel like it's not just monotony."
                ]
            },
            {
                title: "2 Hours Bakugou Breathing Relaxation/ASMR Sleep Aid!",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=qhfgdGC5jks",
                paragraphs: [
                    "Everybody need to listen to this"
                ]
            },
            {
                title: "Self Care Reminder!",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=V0aovioWPmU",
                paragraphs: [
                    "I thought I'd leave a message for you"
                ]
            },

        ]
    },
    {
        name: "Brandon Stanton ",
        description: "an American author, photographer, and blogger",
        img: "https://images.gr-assets.com/authors/1369428598p8/6906496.jpg",
        posts: [
            {
                title: "Human of New York",
                subscriberOnly: true,
                video: "",
                paragraphs: [
                    "I am just figuring out what I want to do",
                    "because it ain't this"
                ]
            },
            {
                title: "Little humans of New York",
                subscriberOnly: true,
                video: "",
                paragraphs: [
                    "Don't be surprised if one says to you.... \"Hey! I am not little. I am big\" ",
                ]
            },
            {
                title: "Brandon Stanton: The Good Story",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=HGzgyVAlsDE",
                paragraphs: [
                    "I was thinking is this stupid what am I doing my just hopeless naive you know am I just playing with fire, it's neighborhood is a lot more dangerous",
                    "The local news wasn't covering the whole city"
                ]
            },
        ]
    },
    {
        name: "Flagrant 2 ",
        description: "a comedy podcast that delivers unfiltered, unapologetic, and unruly hot takes",
        img: "https://i1.sndcdn.com/artworks-000443200662-it459h-t500x500.jpg",
        posts: [
            {
                title: "How To PLEASE A Woman w/ Khalyla Kuhn & Esther Povitsky | Flagrant 2 with Andrew Schulz",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=WUue7_sy9nI",
                paragraphs: [
                    "Flagrant 2 is a comedy podcast that delivers unfiltered, unapologetic, and unruly hot takes directly to your dome piece",
                    "In an era dictated by political correctness, hosts Andrew Schulz and Akaash Singh, along with AlexxMedia and Mark Gagnon, could care less about sensitivities. If it’s funny and flagrant it flies. If you are sensitive this podcast is not for you",

                ]
            },
            {
                title: "Jordan Peterson Shares The Best Major To Get You Laid | Flagrant U with Andrew Schulz",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=a04GaHUB7Qk",
                paragraphs: [
                    "If you are sensitive this podcast is not for you",
                    "But if you miss the days of comedians actually being funny instead of preaching to a quire then welcome to The Flagrancy."
                ]
            },
            {
                title: "Schulz Solves the Gas Crisis | Flagrant 2 with Andrew Schulz and Akaash Singh",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=WxKKzcLZi6o",
                paragraphs: [
                    "Flagrant 2 is a comedy podcast that delivers unfiltered, unapologetic, and unruly hot takes directly to your dome piece. In an era dictated by political correctness, hosts Andrew Schulz and Akaash Singh, along with AlexxMedia and Mark Gagnon, could care less about sensitivities",
                    "If it’s funny and flagrant it flies. If you are sensitive this podcast is not for you. But if you miss the days of comedians actually being funny instead of preaching to a CHOIR then welcome to The Flagrancy."
                ]
            },
        ]
    },
    {
        name: "The Conscious Kid ",
        description: "Parenting and Education Resources through a Critical Race Lens",
        img: "https://www.todaysparent.com/wp-content/uploads/2020/11/conscious-kid-influential-parents-1280x720-766x431.jpg",
        posts: [
            {
                title: "I am enough",
                subscriberOnly: true,
                video: "",
                paragraphs: [
                    "Like time, I am here to be, and be everything I can. The little girl in this story shines like the sun. She sings, soars, and stands like the mountains. Like the winner, I’m here to win, and if I don’t, get up again.",
                    "She is strong and smart and loving and kind, but most importantly, she is herself, and that will always be enough."
                ]
            },
            {
                title: "Eyes That Kiss in the Corners",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=pRY88sKzqSQ",
                paragraphs: [
                    "A young Asian girl notices that her eyes look different from her peers",
                    "They have eyes that kiss in the corners and glow like warm tea, crinkle into crescent moons, and are filled with stories of the past and hope for the future"
                ]
            },
            {
                title: "Sweep: The Story of a Girl and Her Monster",
                subscriberOnly: false,
                video: "",
                paragraphs: [
                    "Nan is a chimney sweep in Victorian London. After her guardian mysteriously disappears, she must learn to fend for herself in this terrifying and dangerous job"
                ]
            },
            {
                title: "Rachel’s Roses",
                subscriberOnly: true,
                video: "",
                paragraphs: [
                    "What will you give up for those you love? Rachel Berger wants special buttons for her Rosh Hashanah outfit, but her family can't afford them, so she sets out to earn the money herself. With the Jewish New Year as a backdrop, Rachel learns what really matters."
                ]
            },
            {
                title: "Grandpa Grumps",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=xDTFL9wOMhs",
                paragraphs: [
                    "Kids will love this funny and heartwarming story about overcoming cultural differences and connecting across generations!"
                ]
            },
        ]
    },
    {
        name: "Kurzgesagt – In a Nutshell",
        description: "a German Science animation and design studio founded by Philipp Dettmer",
        img: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1498161312/Kurzgesagt___In_a_Nutshell__Logo_zf5vww.png",
        posts: [
            {
                title: "What if We Nuke a City?",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=5iPH-br_eJQ",
                paragraphs: [
                    "As you may have noticed, we like to blow stuff up on this channel. So when the International Red Cross approached us to collaborate on a video about nuclear weapons, we were more than excited.",
                    "Until we did the research. It turned out we were a bit oblivious off the real impact of nuclear weapons in the real world, on a real city. And especially, how helpless even the most developed nations on earth would be if an attack occurred today"
                ]
            },
            {
                title: "Why Beautiful Things Make us Happy",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=-O5kNPlUV7w",
                paragraphs: [
                    "It’s hard to define what makes something beautiful, but we seem to know beauty when we see it."
                ]
            },
            {
                title: "Genetic Engineering Will Change Everything Forever",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=jAhjPd4uNFY",
                paragraphs: [
                    "Designer babies, the end of diseases, genetically modified humans that never age. Outrageous things that used to be science fiction are suddenly becoming reality. The only thing we know for sure is that things will change irreversibly."
                ]
            },
            {
                title: "Universal Basic Income Explained",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=kl39KHS07Xc",
                paragraphs: [
                    "What is UBI? How would free money change our lives."
                ]
            },
            {
                title: "How to Cure Aging – During Your Lifetime?",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=MjdpR-TY6QU",
                paragraphs: [
                    "What if we could stop aging forever?"
                ]
            },
        ]
    },
    {
        name: "Amanda Palmer ",
        description: "an American singer, songwriter, musician, and performance artist",
        img: "https://media.wired.com/photos/5933697a58b0d64bb35d5305/master/pass/AmandaPalmer_live.jpg",
        posts: [
            {
                title: "ENJOY THE SILENCE",
                subscriberOnly: true,
                video: "",
                paragraphs: [
                    "This was certainly a passion project for Amanda, who loved the band growing up and whose music helped shape her as a musician"
                ]
            },
            {
                title: "A POEM FOR YOU THIS MORNING",
                subscriberOnly: false,
                video: "",
                paragraphs: [
                    "p.s. if i had any more gratitude these days i’d be on my knees 24/7 unable to do the dishes"
                ]
            },
            {
                title: "Amanda Palmer - Judy Blume",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=Co_BUfSVSm4",
                paragraphs: [
                    "I couldn't carry a tune but I thought I could sing, no one had told me that thoughts were a good or bad thing"
                ]
            },
        ]
    },
    {
        name: "CGP Grey",
        description: "CGP Grey is an American-Irish educational YouTuber, podcaster, and streamer who creates short explanatory videos on subjects",
        img: "https://pbs.twimg.com/profile_images/1220438277796352001/jhrzYrf5_400x400.jpg",
        posts: [
            {
                title: "The Better Boarding Method Airlines Won't Use",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=oAHbLRjF0vo",
                paragraphs: [
                    "Not back-to-front but front to back - the smaller the boarding group the better"
                ]
            },
            {
                title: "A Crime Against Childhood",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=-FBwZtuJtMw",
                paragraphs: [
                    "Won't somebody please think of the children?"
                ]
            },
            {
                title: "How to Become Pope",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=kF8I_r9XT7A",
                paragraphs: [ 
                    "Requirement: 1. Be a Catholic, 2. Be a Man"
                ]
            },
        ]
    },
    {
        name: "Lilydusk ",
        description: "Adult Romance Comics + NSFW art",
        img: "https://i.ibb.co/x8SCX1b/about-nsfw.jpg",
        posts: [
            {
                title: "Midnight Poppy Land",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=p28pMYpMtYU",
                paragraphs: [
                    ".......... there is a woman involved in this?"
                ]
            },

        ]
    },
    {
        name: "Christine McConnell ",
        description: "Christine McConnell",
        img: "https://pbs.twimg.com/profile_images/1150969468618547206/1T-Ccb0A_400x400.png",
        posts: [
            {
                title: "Homemade Gingerbread Tree Topper",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=VYQ3YjOBNXs",
                paragraphs: [
                    "In this episode featured how to make your very own Christmas Tree Topper!"
                ]
            },
            {
                title: "A Vintage Themed Makeup Tutorial",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=IlaqGtqZTO0",
                paragraphs: [
                    "In this episode I feature how I do my makeup and talk about the products I use and love."
                ]
            },
            {
                title: "How to sew your own Gothic Pastel Apron",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=jGgnMdE8fAw",
                paragraphs: [
                    "In this Episode I show you how to create your own gothic pastel baking apron! The pattern for this apron is available for download on Patreon for those in the $7 and up tiers."
                ]
            },
        ]
    },
    {
        name: "ContraPoints",
        description: " video essays and short films",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Natalie_Wynn_%28ContraPoints%29_portrait_1.jpg/640px-Natalie_Wynn_%28ContraPoints%29_portrait_1.jpg",
        posts: [
            {
                title: "Men | ContraPoints",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=S1xxcKCGljY",
                paragraphs: [
                    "Taking the red pill, but make it fashion."
                ]
            },
            {
                title: "Jordan Peterson | ContraPoints",
                subscriberOnly: false,
                video: "https://www.youtube.com/watch?v=4LqZdkkBDas",
                paragraphs: [
                    "The Jordan Peterson moment"
                ]
            },
            {
                title: "Gender Critical | ContraPoints",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=1pTPuoGjQsI",
                paragraphs: [
                    "Let's go adult human females."
                ]
            },
            {
                title: "\"Are Traps Gay?\" | ContraPoints",
                subscriberOnly: true,
                video: "https://www.youtube.com/watch?v=PbBzhqJK3bg",
                paragraphs: [
                    "A psychosexual journey to the heart of a bad meme."
                ]
            },
        ]
    },

]