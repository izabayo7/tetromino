import {FC} from 'react';
import {useSelector} from 'react-redux';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameSelectors} from '../../../store/game/game-selectors';
import {AppCopyright} from '../../atoms/app/AppCopyright';
import {AppDialog, AppDialogControl} from '../../molecules/app/AppDialog';
import {CreditsDialog} from '../../organisms/dialogs/CreditsDialog';
import {AppDarkMode} from '../../molecules/app/AppDarkMode';
import {Button} from '../../organisms/Set/SetButton';

export interface SettingsDialogProps {
    selectWelcoming?: () => boolean;
}

export const SettingsDialog: FC<
    SettingsDialogProps & Partial<AppDialogControl>
> = ({
    selectWelcoming = GameSelectors.welcoming,
    selectOpen = AppSelectors.isOpen(AppDialogType.SETTINGS)
}) => {
    const welcoming = useSelector(selectWelcoming);
    return (
        <AppDialog
            className="max-w-[22rem]"
            title="Settings"
            large={true}
            selectOpen={selectOpen}
        >
            <Button />
        </AppDialog>
    );
};
