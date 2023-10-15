import {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {environment} from '../../environment/environment';
import {AppActions} from '../../store/app/app-actions';
import {AppDialogType} from '../../store/app/app-model';
import {AppSelectors} from '../../store/app/app-selectors';
import {GameActions} from '../../store/game/game-actions';
import {AppLogo} from '../atoms/app/AppLogo';
import {AppMenu, AppMenuItem} from '../atoms/app/AppMenu';
import {AppDarkMode} from '../molecules/app/AppDarkMode';
import {FaCog} from 'react-icons/fa';

export{}

export const Level: FC = () => {
    const level = useSelector(AppSelectors.startLevel);
    return (
        <>
            <div>Ghost Piece</div>
            <div
                className="flex rounded-full text-[12px] p-2 justify-center"
                onClick={() => (AppActions.startLevel())}
            >
            </div>
        </>
    );
};
