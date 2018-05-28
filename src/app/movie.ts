export class Movie {
    id: string;
    title: string;
    genre: string;
    formats: Formats = {
        "dvd":false,
        "digital": false,
        "bluray":false
    };
}

export class Formats {
    dvd: boolean;
    digital: boolean;
    bluray: boolean;
}