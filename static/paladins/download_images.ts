import { download } from "https://deno.land/x/download@v1.0.1/mod.ts";
import {exists, existsSync} from "https://deno.land/std/fs/mod.ts";


// const champions = ['Androxus', 'Ash', 'Atlas', 'Azaan', 'Barik', 'Betty la Bomba', 'Bomb King', 'Buck', 'Cassie', 'Corvus', 'Dredge', 'Drogoz', 'Evie', 'Fernando', 'Furia', 'Grohk', 'Grover', 'Imani', 'Inara', 'Io', 'Jenos', 'Khan', 'Kinessa', 'Koga', 'Lex', 'Lian', 'Lillith', 'Maeve', 'Makoa', "Mal'Damba", 'Moji', 'Octavia', 'Pip', 'Raum', 'Rei', 'Ruckus', 'Saati', 'Seris', 'Sha Lin', 'Skye', 'Strix', 'Talus', 'Terminus', 'Tiberius', 'Torvald', 'Tyra', 'Vatu', 'VII', 'Viktor', 'Vivian', 'Vora', 'Willo', 'Yagorath', 'Ying', 'Zhin']
// const urls = ['https://webcdn.hirezstudios.com/paladins/champion-icons/androxus.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/ash.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/atlas.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/azaan.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/barik.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/betty-la-bomba.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/bomb-king.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/buck.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/cassie.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/corvus.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/dredge.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/drogoz.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/evie.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/fernando.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/furia.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/grohk.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/grover.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/imani.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/inara.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/io.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/jenos.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/khan.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/kinessa.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/koga.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/lex.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/lian.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/lillith.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/maeve.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/makoa.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/maldamba.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/moji.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/octavia.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/pip.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/raum.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/rei.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/ruckus.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/saati.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/seris.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/sha-lin.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/skye.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/strix.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/talus.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/terminus.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/tiberius.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/torvald.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/tyra.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/vatu.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/vii.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/viktor.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/vivian.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/vora.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/willo.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/yagorath.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/ying.jpg', 'https://webcdn.hirezstudios.com/paladins/champion-icons/zhin.jpg'];
const urls = (await (await fetch('https://cms.paladins.com/wp-json/api/champion-hub/1')).json()).map((a: { image: string; })=>a.image)


const champions = urls.map((url: string) => url.replace("https://webcdn.hirezstudios.com/paladins/champion-icons/", "").replace(".jpg", "").replace(/\s+/, ""))
console.log("champions:", champions.length);

champions.forEach(async (champion: string) => {
    const data = await (await fetch(`https://cms.paladins.com/wp-json/wp/v2/champions?slug=${champion}&lang_id=1`)).json();
    data[0].cards.forEach(async (card: { rarity: string; championCard_URL: string; championTalent_URL: string; })=>{
        try {
            if (card.rarity === "Common") {
                if (await exists(`./cards/${card.championCard_URL.replace("https://webcdn.hirezstudios.com/paladins/champion-cards/", "").replace(/\s+/, "")}`)) return
                await download(card.championCard_URL, {
                    dir: "./cards",
                    file: card.championCard_URL.replace("https://webcdn.hirezstudios.com/paladins/champion-cards/", "").replace(/\s+/, "")
                })
            } else {
                if (await exists(`./talents/${card.championTalent_URL.replace("https://webcdn.hirezstudios.com/paladins/champion-legendaries-badge/", "").replace(/\s+/, "")}`)) return
                await download(card.championTalent_URL.replaceAll(" ", ""), {
                    dir: "./talents",
                    file: card.championTalent_URL.replace("https://webcdn.hirezstudios.com/paladins/champion-legendaries-badge/", "").replaceAll(" ", "")
                })
            }
        } catch {
            console.log("can't load:", card.championTalent_URL || card.championCard_URL)
        }    
    })
    try {
        download(`https://webcdn.hirezstudios.com/paladins/champion-icons/${champion}.jpg`, {
            dir: "./champions",
            file: "champion.jpg"
        })
    } catch {
        console.log("can't load:", `https://webcdn.hirezstudios.com/paladins/champion-icons/${champion}.jpg`)
    }
});


const items = ["Illuminate", "Resilience", "Guardian", "Haven", "Nimble", "Master Riding", "Morale Boost", "Chronos", "Kill to Heal", "Life Rip", "Rejuvenate", "Veteran", "Bulldozer", "Deft Hands", "Lethality", "Wrecker"];
const items_urls = [
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/7/79/Card_Illuminate.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/1/1c/Card_Resilience.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/1/1e/Card_Blast_Shields.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/9/9a/Card_Haven.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/b/b2/Card_Nimble.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/5/52/Card_Master_Riding.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/d/da/Card_Morale_Boost.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/f/f2/Card_Chronos.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/4/45/Card_Kill_to_Heal.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/4/41/Card_Life_Rip.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/5/5b/Card_Rejuvenate.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/0/0b/Card_Veteran.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/3/36/Card_Bulldozer.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/4/41/Card_Deft_Hands.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/4/47/Card_Aggression.png",
    "https://static.wikia.nocookie.net/paladins_gamepedia/images/c/c3/Card_Wrecker.png"
];
for (let i = 0; i < items.length; i++) {
    await download(items_urls[i], {
        dir: "./items",
        file: items[i].toLowerCase().replaceAll(" ", "-") + ".png"
    })
}
// try {
//     // NOTE : You need to ensure that the directory you pass exists.
//     for (const url of urls) {
        
//         const destination: Destination = {
//             file: `${url.slice(56)}`,
//             dir: './champions'
//         }


//         const fileObj = await download(url, destination);


//     }    /* sample with mode
//      const destination: Destination = {
//         file: 'example.pdf',
//         dir: './test',
//         mode: 0o777
//     }
//     */
// } catch (err) {
//     console.log(err)
// }
