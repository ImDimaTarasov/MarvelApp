

class MarvelService {
    getResourse = async (url) => {
        let res = await fetch(url);
    
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getAllCharacters = () => {
        return this.getResourse("https://gateway.marvel.com:443/v1/public/characters?apikey=b46cb10af69442a494452cce291a4ff4");
    }
}

export default MarvelService;