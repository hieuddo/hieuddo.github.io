export const headerIcon = '/favicon/monkas.svg';

const PageHeaderIcon = props => {
    return (
        <img
            width={20}
            height={20}
            className="w-5 inline-block transition-transform"
            src={headerIcon}
            alt-text="favicon"
            alt="header icon and favicon"
            {...props}
        />
    )
}

export default PageHeaderIcon
