import 'dotenv/config';
import { seed } from "drizzle-seed";
import { db } from ".";
import { user } from "./schema/auth";
import { pets } from "./schema/pet";


async function main() {
    await seed(db, { user, pets }).refine((f) => ({
        pets: {
            count: 100,
            columns: {
                hp: f.int({
                    minValue: 0, maxValue: 100
                }),

            }

        },
    }));
    process.exit(0);
}

main();