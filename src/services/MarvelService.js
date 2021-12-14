import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=b46cb10af69442a494452cce291a4ff4';

    const _baseOffset = 210;
    const _baseOffsetForComics = 7;
    
    const getAllComics = async(offset = _baseOffsetForComics) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getAllCharacters = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async(id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`)
        return _transformCharacter(res.data.results[0]);
    }
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            img: comics.thumbnail.path + '.' +  comics.thumbnail.extension,
            price: comics.prices[0].price, 

        }
    }
    const _transformCharacter = (char) => {
        if (!char.description){
            char.description = "Sorry, there is no description."
        }
        if (char.description.length > 220){
            let limitOfSymbols = char.description.slice(0, 220);
            char.description = limitOfSymbols.slice(0, limitOfSymbols.lastIndexOf(' ')) + "..."
        } 

        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' +  char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics};
}

export default useMarvelService;