import {
  maintenanceTickets,
  type MaintenanceTicket,
} from "./maintenance";

/**
 * Agent-facing maintenance view.
 *
 * The Agent screens currently use the same record shape as the Landlord
 * maintenance workspace, while keeping a separate export ready for the
 * eventual agent-specific data source.
 */
export const agentMaintenanceTickets: MaintenanceTicket[] =
  maintenanceTickets.slice(0, 7);
