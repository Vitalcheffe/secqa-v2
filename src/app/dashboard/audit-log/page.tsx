'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, FileText, Settings, Shield, Download } from 'lucide-react';


const AUDIT_EVENTS = [
  { id: 'evt_001', timestamp: '2026-06-29 01:23:14', actor: 'founder@secqa.example', action: 'questionnaire.uploaded', resource: 'q_001 (Acme Corp CAIQ)', ip: '192.168.1.1', icon: FileText, severity: 'info' },
  { id: 'evt_002', timestamp: '2026-06-29 01:23:42', actor: 'founder@secqa.example', action: 'answer.generated', resource: 'q_001 question 47', ip: '192.168.1.1', icon: FileText, severity: 'info' },
  { id: 'evt_003', timestamp: '2026-06-29 01:24:15', actor: 'founder@secqa.example', action: 'answer.approved', resource: 'q_001 question 47', ip: '192.168.1.1', icon: Shield, severity: 'success' },
  { id: 'evt_004', timestamp: '2026-06-28 22:47:03', actor: 'security@secqa.example', action: 'answer.rejected', resource: 'q_006 question 12', ip: '10.0.0.5', icon: Shield, severity: 'warning' },
  { id: 'evt_005', timestamp: '2026-06-28 18:12:33', actor: 'founder@secqa.example', action: 'integration.connected', resource: 'slack', ip: '192.168.1.1', icon: Settings, severity: 'info' },
  { id: 'evt_006', timestamp: '2026-06-28 16:45:21', actor: 'founder@secqa.example', action: 'user.invited', resource: 'security@secqa.example', ip: '192.168.1.1', icon: User, severity: 'info' },
  { id: 'evt_007', timestamp: '2026-06-28 14:02:17', actor: 'system', action: 'subscription.renewed', resource: 'sub_001 (Pro tier)', ip: '—', icon: Shield, severity: 'success' },
  { id: 'evt_008', timestamp: '2026-06-28 11:38:55', actor: 'founder@secqa.example', action: 'export.generated', resource: 'q_003 (Snowflake, PDF)', ip: '192.168.1.1', icon: Download, severity: 'info' },
  { id: 'evt_009', timestamp: '2026-06-28 09:15:42', actor: 'founder@secqa.example', action: 'answer_library.updated', resource: 'a_004 (SOC2 certification)', ip: '192.168.1.1', icon: FileText, severity: 'info' },
  { id: 'evt_010', timestamp: '2026-06-27 23:47:11', actor: 'system', action: 'login.failed', resource: 'unknown@external.com', ip: '203.0.113.45', icon: Shield, severity: 'error' }
];

const SEVERITY_COLORS = {
  info: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700'
};

export default function AuditLogPage() {
  return (
    <div className='flex flex-col p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Audit Log</h1>
          <p className='text-sm text-muted-foreground'>All account activity for compliance and security review</p>
        </div>
        <Badge variant='outline'>{AUDIT_EVENTS.length} events (last 7 days)</Badge>
      </div>

      <Card className='overflow-hidden'>
        <table className='w-full'>
          <thead className='border-b bg-muted/50'>
            <tr>
              <th className='text-left p-3 text-sm font-medium'>Timestamp</th>
              <th className='text-left p-3 text-sm font-medium'>Actor</th>
              <th className='text-left p-3 text-sm font-medium'>Action</th>
              <th className='text-left p-3 text-sm font-medium'>Resource</th>
              <th className='text-left p-3 text-sm font-medium'>IP</th>
              <th className='text-left p-3 text-sm font-medium'>Severity</th>
            </tr>
          </thead>
          <tbody>
            {AUDIT_EVENTS.map((evt) => (
              <tr key={evt.id} className='border-b hover:bg-muted/30'>
                <td className='p-3 text-xs font-mono text-muted-foreground'>{evt.timestamp}</td>
                <td className='p-3 text-sm'>{evt.actor}</td>
                <td className='p-3 text-sm font-mono'>{evt.action}</td>
                <td className='p-3 text-sm text-muted-foreground'>{evt.resource}</td>
                <td className='p-3 text-xs font-mono text-muted-foreground'>{evt.ip}</td>
                <td className='p-3'>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${SEVERITY_COLORS[evt.severity as keyof typeof SEVERITY_COLORS]}`}>
                    {evt.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-4'>
        <Card className='p-4'>
          <div className='text-sm text-muted-foreground'>Total events</div>
          <div className='text-2xl font-bold'>{AUDIT_EVENTS.length}</div>
        </Card>
        <Card className='p-4'>
          <div className='text-sm text-muted-foreground'>Errors</div>
          <div className='text-2xl font-bold text-red-600'>{AUDIT_EVENTS.filter(e => e.severity === 'error').length}</div>
        </Card>
        <Card className='p-4'>
          <div className='text-sm text-muted-foreground'>Warnings</div>
          <div className='text-2xl font-bold text-yellow-600'>{AUDIT_EVENTS.filter(e => e.severity === 'warning').length}</div>
        </Card>
        <Card className='p-4'>
          <div className='text-sm text-muted-foreground'>Log retention</div>
          <div className='text-2xl font-bold'>1 year</div>
        </Card>
      </div>

      <Card className='p-4 mt-6 bg-muted/30'>
        <p className='text-sm text-muted-foreground'>
          <Shield className='inline h-4 w-4 mr-1' />
          Audit logs are retained for 1 year and are available to compliance auditors on request.
          All log entries are tamper-evident and stored in append-only format.
        </p>
      </Card>
    </div>
  );
}
