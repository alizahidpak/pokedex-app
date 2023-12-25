<template>
    <svg
        :aria-labelledby="iconName"
        :height="height"
        :width="width"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title :id="iconName">{{ iconName }} icon</title>
        <g :fill="iconColor" :stroke="iconColor">
            <component :is="iconPath" />
        </g>
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IconSun, IconMoon } from "@/components/icons";

@Component({
    components: {
        IconSun,
        IconMoon,
    },
})
export default class IconBase extends Vue {
    @Prop({ default: "box" }) iconName!: string;
    @Prop({ default: "1em" }) height!: string;
    @Prop({ default: "1em" }) width!: string;
    @Prop({ default: "currentColor" }) iconColor!: string;

    get iconPath() {
        return `Icon${this.iconName}`;
    }
}
</script>

<style scoped>
svg {
    display: inline-block;
}
</style>
