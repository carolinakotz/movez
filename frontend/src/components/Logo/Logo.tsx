type LogoProps = {
    className?: string;
};

export default function Logo({ className = 'h-10 w-auto' }: LogoProps) {
    return <img src="/img/movez-logo.png" alt="MovEz" width={640} height={209} className={className} />;
}
