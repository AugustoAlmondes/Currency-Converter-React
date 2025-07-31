import './Background.css';

export default function Background() {
    return (
        <div className="particles-background">
            {[...Array(15)].map((_, i) => (
                <div key={i} className="particle" style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    animationDelay: `${Math.random() * 5}s`
                }}></div>
            ))}
        </div>
    );
}