import {
    DEFAULT_KEY_BINDINGS,
    KeyBindings
} from '../../components/particles/key_bindings.types';
import {environment} from '../../environment/environment';

/**
 * Defines dialogs that can be shown.
 */
export enum AppDialogType {
    OPTIONS = 'options',
    SWIPEOPTIONS = 'swipeoptions',
    HIGH_SCORES = 'high_scores',
    CREDITS = 'credits',
    SETTINGS = 'settings'
}

export interface AppModel {
    /**
     * Toggles dark mode for the theme.
     */
    dark: boolean;

    /**
     * Current visible dialog.
     */
    dialog?: AppDialogType;

    /**
     * Show a ghost of where a piece will land.
     */
    ghost_piece: boolean;
    swipe: 'on' | 'off';
    hand: 'right' | 'left';

    /**
     * List of high scores.
     */
    high_scores: Array<number>;

    /**
     * Game keyboard bindings.
     */
    keys: KeyBindings;

    /**
     * Play music.
     */
    music: boolean;

    /**
     * Music track to play.
     */
    music_type: number;

    /**
     * Music volume.
     */
    music_volume: number;

    /**
     * Play sound effects.
     */
    sound: boolean;

    /**
     * Sound volume.
     */
    sound_volume: number;

    /**
     * Player's starting level.
     */
    start_level: number;
}

/**
 * Default state for the app.
 */
export const APP_INITIAL_STATE: AppModel = {
    dark: false,
    ghost_piece: true,
    swipe: 'off',
    high_scores: [],
    music: true,
    hand: 'right',
    music_type: 0,
    music_volume: 80,
    sound: true,
    sound_volume: 80,
    start_level: 1,
    keys: DEFAULT_KEY_BINDINGS
};

/**
 * Selection of state properties to persist to localStorage along with a
 * version to track compatability.
 */
export type AppPersist = Pick<
    AppModel,
    | 'dark'
    | 'ghost_piece'
    | 'swipe'
    | 'hand'
    | 'start_level'
    | 'sound'
    | 'sound_volume'
    | 'music'
    | 'music_volume'
    | 'music_type'
    | 'high_scores'
    | 'keys'
> & {version: string};

/**
 * Defaults persist values.
 */
export const APP_PERSIST_DEFAULT: AppPersist = {
    dark: APP_INITIAL_STATE.dark,
    ghost_piece: APP_INITIAL_STATE.ghost_piece,
    swipe: APP_INITIAL_STATE.swipe,
    hand: APP_INITIAL_STATE.hand,
    start_level: APP_INITIAL_STATE.start_level,
    sound: APP_INITIAL_STATE.sound,
    sound_volume: APP_INITIAL_STATE.sound_volume,
    music: APP_INITIAL_STATE.music,
    music_volume: APP_INITIAL_STATE.music_volume,
    music_type: APP_INITIAL_STATE.music_type,
    high_scores: APP_INITIAL_STATE.high_scores,
    keys: APP_INITIAL_STATE.keys,
    version: environment.version
};

export const APP_NAME = 'app';
