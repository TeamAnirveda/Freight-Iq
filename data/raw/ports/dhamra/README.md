Dhamra port - raw sources and extraction notes
=============================================

Sources consulted
-----------------

1. Adani Ports — Dhamra Port (operator landing page)
   - URL: https://www.adaniports.com/ports-and-terminals/dhamra-port
   - Accessed: 07 September, 2026

2. Dhamra Berthing Policy & Tariff Structure (BPTS) — operator PDF (authoritative for berth parameters)
   - URL: https://www.adaniports.com/-/media/Project/Ports/PortsAndTerminals/Dhamra-Port/Tariff/Dhamra-BPTS_DPC_01-WEF-1-Apr-2026.pdf
   - Publication / effective date: 01 April, 2026
   - Treated as authoritative for berth LOA, displacement limits, berth allocation and operational restrictions.

3. Adani Ports — Dhamra downloads page
   - URL: https://www.adaniports.com/ports-and-terminals/dhamra-port/download
   - Accessed: 07 September, 2026

4. Adani Ports — Dhamra vessel schedule (for berth naming cross-check)
   - URL: https://www.adaniports.com/ports-and-terminals/dhamra-port/vesselschedule
   - Accessed: 07 September, 2026

5. Adani Ports FY2024-25 Annual Report (for corroboration of installed infrastructure)
   - URL: https://www.adaniports.com/-/media/Project/Ports/Investor/Investor-Downloads/Annual-Report/FY25.pdf
   - Accessed: 07 September, 2026

Authoritative source choice
-------------------------

The Dhamra BPTS PDF (01 April 2026) is treated as the authoritative source for berth-level designed parameters (LOA, displacement), allocation policy and operational restrictions. The operator landing page and downloads are used for port-level corroboration and naming.

Port-level values extracted
--------------------------

- `port_id`: DHAMRA
- `port_name`: Dhamra Port
- `state`: Odisha
- `port_type`: Private Port (operator: Adani Ports)
- `cargo_types`: Dry Bulk; Break Bulk; LNG; Liquid Bulk; Coal; Iron Ore; Limestone; Project Cargo; Steel (as supported by operator materials)
- `annual_capacity_mt`: left blank — official sources provide designed infrastructure and berth parameters but do not supply a single consolidated current installed annual capacity applicable across the port (expansions ongoing). Do not conflate throughput with capacity.
- `notes`: Current designed berth structure per Dhamra BPTS (April 2026) and guidance that monthly draft declarations govern permissible draft at each berth.

Berth-level values extracted (from Dhamra BPTS April 2026)
-----------------------------------------------

- BB1
  - `max_loa_m`: 350
  - `special_restrictions`: "Displacement limit 250000 MT; Priority: Import Mechanised; berth allocation & operational restrictions per Dhamra BPTS; monthly draft declarations govern permissible draft; trim/list and wind restrictions"
  - `equipment`: Mechanised
  - `source_url` / `source_date`: Dhamra BPTS PDF (01 April, 2026)

- BB2
  - `max_loa_m`: 350
  - `special_restrictions`: "Displacement limit 250000 MT; Priority: Import Mechanised; berth allocation & operational restrictions per Dhamra BPTS; monthly draft declarations govern permissible draft; trim/list and wind restrictions"
  - `equipment`: Mechanised

- BB3
  - `max_loa_m`: 350
  - `special_restrictions`: "Displacement limit 250000 MT; Priority: Export Mechanised; berth allocation & operational restrictions per Dhamra BPTS; monthly draft declarations govern permissible draft; trim/list and wind restrictions"
  - `equipment`: Mechanised

- BB3A
  - `max_loa_m`: 350
  - `special_restrictions`: "Displacement limit 250000 MT; Semi-Mechanised/manual handling; berth allocation & operational restrictions per Dhamra BPTS"
  - `equipment`: Semi-Mechanised

- BB4
  - `max_loa_m`: 347
  - `special_restrictions`: "Displacement limit 250000 MT; Semi-Mechanised/manual handling; berth allocation & operational restrictions per Dhamra BPTS"
  - `equipment`: Semi-Mechanised

- Barge Berth
  - `max_loa_m`: 130
  - `special_restrictions`: "Displacement limit 8000 MT; general cargo operations per BPTS"

- LNG Berth
  - `max_loa_m`: 350
  - `cargo_type`: LNG
  - `special_restrictions`: "Displacement limit 180000 MT; LNG-specific operating limits per BPTS; monthly draft declarations govern permissible draft"

Fields intentionally left blank and why
------------------------------------

- `max_beam_m`: left blank for port and berths — Dhamra BPTS does not provide a clear permissible beam limit per berth.
- `max_draft_m`: left blank at berth-level unless a specific current monthly draft declaration provides an explicit permissible draft for that berth; the BPTS cautions that permissible draft is promulgated monthly and can vary.
- `max_dwt_mt`: left blank — displacement is recorded as an operational restriction rather than converted to DWT.
- `berth_length_m`: left blank — BPTS provides LOA/design figures; do not infer berth length from vessel LOA.
- `handling_rate_mt_hr` and per-berth `annual_capacity_mt`: left blank — BPTS provides system-level handling rates in some contexts but not definitive berth-specific rates.
- `equipment`: only populated where the BPTS explicitly describes mechanisation level for the berth (Mechanised / Semi-Mechanised). Other specific equipment counts are left to port-level notes or omitted unless explicitly berth-associated.

Distinctions and notes
----------------------

- Displacement vs DWT: displacement figures in the BPTS are preserved in `special_restrictions`. Do not convert to `max_dwt_mt` without explicit source.
- Design draft vs current permissible draft: the BPTS notes monthly draft declarations; therefore `max_draft_m` is left blank unless a dated monthly draft document is cited for a berth.
- Handling-system rates vs berth rates: system-level design rates are not directly mapped to per-berth `handling_rate_mt_hr` unless the BPTS explicitly links them to a berth.

Limitations and ambiguities
--------------------------

- BPTS provides designed LOA and displacement but defers permissible operating draft to monthly declarations; these are not reflected as static `max_draft_m` values here.
- Beam, berth length, specific equipment counts and per-berth handling rates are not provided in a clearly mappable way in BPTS; fields remain blank accordingly.

If you want, I can parse the Dhamra BPTS PDF for any explicit numeric berth-specific permissible draft values or equipment counts and add them only when explicitly present with a date stamp.
