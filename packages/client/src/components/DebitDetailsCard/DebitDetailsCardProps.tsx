/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

 type DebitDetailsCardProps = {
    title: string,
    text: string[],
    sessionId: string | null
    copy: boolean
    onClick: () => void
 }

 export default DebitDetailsCardProps