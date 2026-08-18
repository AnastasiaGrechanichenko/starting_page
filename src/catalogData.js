import { novelty2026,animeBooks,studyBooks, poetryBooks,detectiveBooks,sciFiBooks} from "./data";
const allBooks = [
    ...novelty2026.map(book=> ({...book,category:'novelty'})),
    ...animeBooks.map(book=> ({...book,category:'anime'})),
    ...studyBooks.map(book=> ({...book, category:'study'})),
    ...poetryBooks.map(book=> ({...book, category:'poetry'})),
    ...detectiveBooks.map(book=> ({...book, category:'detective'})),
    ...sciFiBooks.map(book=> ({...book, category:'sci-fi'})),

];

export default allBooks