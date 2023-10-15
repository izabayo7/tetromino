import classNames from 'classnames';
import {FC} from 'react';
import {ClassNameProps} from '../../particles/particles.types';

export interface GameSetting {
    title: string;
}

export interface GameSettingsProps {
    settings: Array<GameSetting>;
}

export const GameCredits: FC<GameSettingsProps & ClassNameProps> = ({
    settings,
    className
}) => {
    return (
        <div className={classNames(className, 'flex flex-col text-xs -mb-3')}>
            {settings.map(({title}, indx) => (
                <div className="flex flex-col mb-3" key={indx}>
                    <div>{title}:</div>
                </div>
            ))}
        </div>
    );
};
