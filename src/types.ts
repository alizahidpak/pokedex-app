export interface PokemonType {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: Type[];
    abilities?: Ability[];
    stats: Stat[];
    sprites: {
        front_default: string;
    };
    game_indices: GameIndex[];
    moves: Move[];
    isFavorite?: boolean;
}

export interface Type {
    type: NamedAttr;
}

export interface Ability {
    ability: NamedAttr;
}

export interface Stat {
    base_stat: number;
    stat: NamedAttr;
}

export interface GameIndex {
    version: NamedAttr;
}

export interface Move {
    move: NamedAttr;
}

export interface NamedAttr {
    name: string;
}
