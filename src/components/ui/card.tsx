interface CardProps {
 children: React.ReactNode
 className?: string
}

export function Card({ children, className }: CardProps) {
 return (
   <div className={`bg-white shadow-sm rounded-lg ${className}`}>
     {children}
   </div>
 )
}
