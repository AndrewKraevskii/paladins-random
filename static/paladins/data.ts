// const champions = ['Androxus', 'Ash', 'Atlas', 'Azaan', 'Barik', 'Betty la Bomba', 'Bomb King', 'Buck', 'Cassie', 'Corvus', 'Dredge', 'Drogoz', 'Evie', 'Fernando', 'Furia', 'Grohk', 'Grover', 'Imani', 'Inara', 'Io', 'Jenos', 'Khan', 'Kinessa', 'Koga', 'Lex', 'Lian', 'Lillith', 'Maeve', 'Makoa', "Mal'Damba", 'Moji', 'Octavia', 'Pip', 'Raum', 'Rei', 'Ruckus', 'Saati', 'Seris', 'Sha Lin', 'Skye', 'Strix', 'Talus', 'Terminus', 'Tiberius', 'Torvald', 'Tyra', 'Vatu', 'VII', 'Viktor', 'Vivian', 'Vora', 'Willo', 'Yagorath', 'Ying', 'Zhin']

const urls = (await (await fetch('https://cms.paladins.com/wp-json/api/champion-hub/1')).json()).map((a: { image: string; })=>a.image)


const champions = urls.map((url: string) => url.replace("https://webcdn.hirezstudios.com/paladins/champion-icons/", "").replace(".jpg", "").replace(/\s+/, ""))
console.log("champions:", champions.length);
const talents = [];
champions.forEach(async (champion: string) => {
    const data = await (await fetch(`https://cms.paladins.com/wp-json/wp/v2/champions?slug=${champion}&lang_id=1`)).json();
    talents.push(...data[0].cards.filter(card=>card.rarity=="Common").map(card=>{
        return {
            name: card.card_name,
            champion_id: data[0].frontend_info.id,
            image: "paladins/cards/"+card.card_name.toLowerCase().replaceAll(" ", "-").replaceAll("'", "") + ".jpg"
        }
    }))
});
setTimeout(()=>{
    console.log(talents.length);
    Deno.writeTextFileSync("data.json", 
        JSON.stringify(talents, null, 2)
    )
}, 8000)
