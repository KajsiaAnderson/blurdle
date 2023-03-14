import movieBank from "./movie-bank.txt";

export const boardDefault = [
    [""],
    [""],
    [""],
    [""],
    [""],
    [""],
];

export const getDayOfTheYear = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = now - start
    const oneDay = 1000 * 60 * 60 * 24
    const day = Math.floor(diff / oneDay)
    return day
}

export const generateMovieSet = async () => {
    let movieSet;
    let todaysMovie;
    await fetch(movieBank)
        .then((response) => response.text())
        .then((result) => {
            const movieArr = result.split("\n");
            todaysMovie = movieArr[getDayOfTheYear()];
            movieSet = new Set(movieArr);
        });
    return { movieSet, todaysMovie };
};