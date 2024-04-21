import connection from "../connection.js";
import { Game } from "../entities/Game.js";
import { Rating } from "../entities/Rating.js";
import { User } from "../entities/User.js";

async function seed() {
    connection.setOptions({ logging: true });

    const gameRepository = connection.getRepository(Game);
    const userRepository = connection.getRepository(User);
    const ratingRepository = connection.getRepository(Rating);

    await connection.query(
        `
        UPDATE sqlite_sequence 
            SET seq = 0 
        WHERE 
            name = "user" OR 
            name = "game" OR 
            name = "user_game"
        `
    );

    await ratingRepository.clear();
    await gameRepository.clear();
    await userRepository.clear();

    const savedGames: Game[] = await gameRepository.save(games);
    const savedUsers: User[] = await userRepository.save(users);

    const ratings: Partial<Rating>[] = [
        {
            game: savedGames[0],
            user: savedUsers[0],
            rating: 5,
        },
        {
            game: savedGames[1],
            user: savedUsers[0],
            rating: 7,
        },
        {
            game: savedGames[2],
            user: savedUsers[0],
            rating: 9,
        },
        {
            game: savedGames[0],
            user: savedUsers[1],
            rating: 10,
        },
        {
            game: savedGames[2],
            user: savedUsers[1],
            rating: 4,
        },
    ];

    await ratingRepository.save(ratings);
}

const games: Array<Partial<Game>> = [
    { name: "Skyrim" },
    { name: "Oblivion" },
    { name: "Morrowind" },
];

const users: Array<Partial<User>> = [
    {
        username: "alex",
        email: "alex@mail.com",
        password: "00001111",
    },
    {
        username: "sarah",
        email: "sarah@mail.com",
        password: "11001111",
    },
];

seed();
