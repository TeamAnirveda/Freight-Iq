Sources used:
- https://paradipport.gov.in/know-your-port/ (Know Your Port) — page last updated: 2 March, 2026
- https://paradipport.gov.in/berth-specifications/ (Berth Specifications) — page last updated: 23 February, 2026
- https://paradipport.gov.in/infrastructure/general-cargo-berth/ (General Cargo Berth) — referenced for contextual berth grouping; last updated: 20 August, 2026
- https://paradipport.gov.in/infrastructure/iron-ore-handling-plant-iohp/ (Iron Ore Handling Plant) — referenced where clearly applicable
- https://paradipport.org/Infrastructure.aspx (Paradip Port Authority legacy site) — used only for cross-reference where applicable

Data extracted:
- Port-level record for Paradip Port written to `data/processed/ports/ports_master.csv`.
- Berth-level records (24 rows) written to `data/processed/ports/port_berths.csv` corresponding to the 18 regular berths plus 3 SPM terminals listed on the official berth specification page, and including North Quay-02, North Quay-03 and the Ro-Ro Jetty where present in the official table.

Fields intentionally left blank:
- Any numeric field (e.g., `max_dwt_mt`, `berth_length_m`, `handling_rate_mt_hr`, `annual_capacity_mt`) was left empty unless the exact value was explicitly provided on the cited official pages.
- Where the berth table provided a set of three numeric columns (interpreted as max LOA, max beam, max draft), `berth_length_m` was only populated when the page explicitly stated a berth length (e.g., RO-RO Jetty: "Berth length - 50Mtrs.").

Notes and provenance:
- The primary authoritative source for berth-level limits is the Berth Specifications page at https://paradipport.gov.in/berth-specifications/ (Last updated 23 February, 2026). I used that table directly to populate berth rows; I preserved the official cargo terminology and any notes/restrictions verbatim where practical.
- Port-level summaries (cargo types, approach/entrance channel depths, port rated capacity) were taken from the Know Your Port page (https://paradipport.gov.in/know-your-port/ — Last updated 2 March, 2026).
- The Iron Ore Handling Plant (IOHP) page lists equipment and capacities (ship loader/plant rated capacities and annual throughput). Where a value explicitly applies to the Iron Ore Berth (e.g., ship loader rated capacity and annual rated throughput), it was considered for the corresponding berth. No values were inferred or calculated.

No inference policy:
- No DWT values were inferred from vessel categories or dimensions. Only explicitly stated DWT values (e.g., SPM Terminal - 1 Max.DWT) were recorded.
- No annual capacities or handling rates were calculated from other numbers; they appear only where the official source stated them.

Last note:
- The berth specification page clearly indicates it was last updated 23 February, 2026. All berth rows reference that page and that date in their `source_url`/`source_date` fields.
