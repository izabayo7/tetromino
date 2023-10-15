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
export interface SwipeOptionsDialogProps {
    selectWelcoming?: () => boolean;
}

export const SwipeOptionsDialog: FC<
    SwipeOptionsDialogProps & Partial<AppDialogControl>
> = ({
    selectWelcoming = GameSelectors.welcoming,
    selectOpen = AppSelectors.isOpen(AppDialogType.SWIPEOPTIONS)
    //selectStart = AppSelectors.startLevel
}) => {
    const welcoming = useSelector(selectWelcoming);
    //const startLevel = useSelector(selectStart);
    return (
        <AppDialog
            className="max-w-[22rem]"
            title="Swipe Controls"
            large={true}
            selectOpen={selectOpen}
        >
            <GameOptions darkMode={!welcoming} />
        </AppDialog>
    );
};
