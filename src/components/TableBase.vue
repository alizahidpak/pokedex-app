<template>
    <table v-if="pokemon.length > 0">
        <tbody>
            <tr v-for="item in pokemon" :key="item.id">
                <td>
                    <div class="primary-information" @click="goToDetails(item)">
                        <img
                            :alt="item.name"
                            :src="
                                item.sprites.front_default ||
                                '/src/assets/img/pokeball.png'
                            "
                        />
                        <p class="name">
                            {{ stringUtils.upperCaseFirstLetter(item.name) }}
                        </p>
                    </div>
                    <div class="secondary-information">
                        <div>
                            <ul>
                                <li
                                    v-for="element in item.types"
                                    :key="element.type.name"
                                >
                                    {{
                                        stringUtils.upperCaseFirstLetter(
                                            element.type.name
                                        )
                                    }}
                                </li>
                            </ul>
                            <p>Height: {{ item.height }}</p>
                            <p>Weight: {{ item.weight }}</p>
                        </div>
                        <ToggleFavoriteButton :pokemon="item" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { useStringUtils } from "@/utils/string-utils";
import { ToggleFavoriteButton } from "@/components";
import type { PokemonType } from "@/types";

@Component({
    components: {
        ToggleFavoriteButton,
    },
})
export default class TableBase extends Vue {
    @Prop({
        default: () => [],
        type: Array,
    })
    readonly pokemon!: PokemonType[];

    stringUtils = useStringUtils();

    goToDetails(pokemon: PokemonType) {
        this.$router.push({ name: "details", params: { name: pokemon.name } });
    }
}
</script>

<style lang="scss" scoped>
table {
    border-spacing: 0;
    width: 100%;
    margin-bottom: auto;
}

td {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    text-align: left;
    border-bottom: 1px solid rgba(85, 85, 85, 0.5);
}

tr:last-child td {
    border-bottom: none;
}

img {
    width: 10rem;
    height: 10rem;
}

ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    font-weight: 600;
}

.primary-information {
    display: flex;
    gap: 1rem;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
}

.name:hover {
    text-decoration: underline;
    opacity: 0.8;
}

.secondary-information {
    display: flex;
    justify-content: space-between;
}

.secondary-information div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
