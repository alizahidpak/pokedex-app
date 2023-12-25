<template>
    <div class="pokeball"></div>
</template>

<style lang="scss" scoped>
@keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-30px);
    }
    60% {
        transform: translateY(-15px);
    }
}

.pokeball {
    width: 10rem;
    height: 10rem;
    background-image: url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png");
    background-size: contain;
    background-position: center;
    margin: 0 auto;
    animation: bounce 2s infinite;
}
</style>
