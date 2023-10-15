import {FC} from 'react';
import {useSelector} from 'react-redux';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameSelectors} from '../../../store/game/game-selectors';
import {AppCopyright} from '../../atoms/app/AppCopyright';
import {AppDialog, AppDialogControl} from '../../molecules/app/AppDialog';
import {GameOptions} from '../game/GameOptions';
import {AppDarkMode} from '../../molecules/app/AppDarkMode';
import {UiButton} from '../../particles/ui/UiButton';
import {AppActions} from '../../../store/app/app-actions';
export interface OptionsDialogProps {
    selectWelcoming?: () => boolean;
}

export const OptionsDialog: FC<OptionsDialogProps & Partial<AppDialogControl>> =
    ({
        selectWelcoming = GameSelectors.welcoming,
        selectOpen = AppSelectors.isOpen(AppDialogType.OPTIONS)
        //selectStart = AppSelectors.startLevel
    }) => {
        const welcoming = useSelector(selectWelcoming);
        //const startLevel = useSelector(selectStart);
        return (
            <AppDialog
                className="max-w-[22rem]"
                title="Settings"
                large={true}
                selectOpen={selectOpen}
            >
                <GameOptions darkMode={!welcoming} />
                <AppDarkMode className="ml-auto mr-auto mt-5 mb-auto" />
            </AppDialog>
        );
    };
