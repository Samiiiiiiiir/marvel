import { Component } from "react";

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <h2>Запасной компонент при ошибке</h2>;
        }

        return this.props.children; // компонент, который был 
        // передан вовнутрь этому компоненту. его "ребенок"

    }
}

export default ErrorBoundary;

