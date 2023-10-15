import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {environment} from '../../../environment/environment';
import {AppActions} from '../../../store/app/app-actions';
import {AppDialogType} from '../../../store/app/app-model';
import {AppSelectors} from '../../../store/app/app-selectors';
import {GameActions} from '../../../store/game/game-actions';
import {AppLogo} from '../../atoms/app/AppLogo';
import {AppMenu, AppMenuItem} from '../../atoms/app/AppMenu';
import {AppDarkMode} from '../../molecules/app/AppDarkMode';

export interface ButtonProps {
    selectWelcoming?: () => boolean;
}

export const Button: FC<ButtonProps> = ({}) => {
    const menu: Array<AppMenuItem> = useMemo(() => {
        return [
            {
                title: 'D-Pad Controls',
                action: AppActions.open(AppDialogType.OPTIONS)
            },
            {
                title: 'Swipe Controls',
                action: AppActions.open(AppDialogType.SWIPEOPTIONS)
            }
            // {title: 'Credits', action: AppActions.open(AppDialogType.CREDITS)}
        ];
    }, []);

    return (
        <div className="flex flex-col h-full">
            <AppMenu className="w-44 ml-auto mr-auto" items={menu} />
        </div>
    );
};
