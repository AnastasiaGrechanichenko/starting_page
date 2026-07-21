import { novelty2026,animeBooks,studyBooks } from "./data";
const allBooks = [
    ...novelty2026.map(book=> ({...book,category:'Новинки'})),
    ...animeBooks.map(book=> ({...book,category:'Аниме'})),
    ...studyBooks.map(book=> ({...book, category:'Учебная литература'}))
];

export default allBooks