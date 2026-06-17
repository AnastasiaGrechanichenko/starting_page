import { novelty2026,animeBooks,studyBooks } from "./data";
const allBooks = [
    ...novelty2026.map(book=> ({...book,category:'novelty'})),
    ...animeBooks.map(book=> ({...book,category:'anime'})),
    ...studyBooks.map(book=> ({...book, category:'study'}))

];

export default allBooks