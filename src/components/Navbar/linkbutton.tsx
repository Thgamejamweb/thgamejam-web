import './linkbutton.css'


interface ILinkButtonInfo {
    name: string,
    href: string,
}
export default function LinkButton(info: ILinkButtonInfo) {
    return (
        <a className="panel_button" href={info.href}>{info.name}</a>
    )
}