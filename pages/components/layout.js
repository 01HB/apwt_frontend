import NewHead from "./newhead";
import Navpanel from "./navpanel";
import Footer from "./footer";

export default function Layout(props) {

    return (
        <>
            <NewHead title={props.title} />
            <Navpanel />
            {props.children}
            <Footer />
        </>
    );
}
