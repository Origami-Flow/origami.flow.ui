import clsx from 'clsx';

export default function TipoAgendamento({ tipo, className }) {
    return (
        <div className="flex flex-row items-center">
            <div className={clsx('size-4 rounded-full', className)}>
            </div>
            <p className="ml-1">
                {tipo}
            </p>
        </div>
    )
}