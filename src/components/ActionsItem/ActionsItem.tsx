interface ActionsItemProps {
    children: React.ReactNode;
    classNames?: string;
    onClick?: () => void;
}

export const ActionsItem = ({ children, classNames = "", onClick }: ActionsItemProps) => {
    return (
        <button style={{ transition: 'all 0.2s ease' }} className={`ActionsItem flex flex-col rounded-xl hover:backdrop-blur-2xl hover:backdrop-brightness-90 active:backdrop-brightness-80 ${classNames}`} onClick={onClick}>
            {children}
        </button>
    )
}