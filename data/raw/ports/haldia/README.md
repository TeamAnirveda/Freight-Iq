Haldia Dock Complex (HDC) — dataset provenance and extraction notes
===============================================================

Primary authoritative source
---------------------------

- Syama Prasad Mookerjee Port Authority (SMPA) — Administrative Report 2024-25
  - URL: https://smportkolkata.shipping.gov.in/smpk/wp-content/uploads/2026/04/Administrative-Report-2024-2025-Soft-Copy_compressed.pdf
  - Table used: Table I (Contd.) — Vital Port Statistics (C) Berth Particulars — B. Haldia Dock Complex
  - This table is the authoritative source for berth particulars (New berth number, Type, Designed/Draft (m), Present Depth (m) 2024-25, Quay Length (m), Maximum LOA (m), Designed DWT).

Secondary SMPA validation sources (used only for nomenclature/structure confirmation)
----------------------------------------------------------------------------------

- SMPA Haldia RFQ / Tender (11 May 2026) — used to confirm current structure and existence of oil jetties / barge jetties and recent nomenclature notes: https://smportkolkata.shipping.gov.in/smpk/hld/wp-content/uploads/sites/3/2026/05/RFQ-cum-RFP-11052026.pdf
- SMPA Tender listing confirming Berth renumbering (Berth 9/10 renumbering note): https://smportkolkata.shipping.gov.in/smpk/hld/en/tender-details/?tenderId=9212

Dataset scope and approach
--------------------------

- Scope: 18 static berth/jetties records for Haldia Dock Complex (HDC) extracted from the SMPA Administrative Report 2024-25. These are:
  - Berth 1 .. Berth 14 (impounded dock berths)
  - Berth 16(O), Berth 17(O), Berth 18(O) (riverine oil jetties; current names used)
  - OT-II (Outer Terminal II)

- Only official, static values from the Administrative Report were used. No values were invented or inferred.

Field mapping rules applied
-------------------------

- `cargo_types`: populated using the berth type / cargo description as provided in the SMPA table.
- `max_loa_m`: taken from "Maximum LOA (m)" in the SMPA table.
- `max_draft_m`: taken from the "Designed/Draft (m)" column in the SMPA table (explicit instruction).
- `special_restrictions`: records the "Present depth 2024-25: X m" value as contextual operational depth; present depths were NOT copied into `max_draft_m`.
- `berth_length_m`: taken from "Quay Length (m)" in the SMPA table.
- `max_dwt_mt`: populated from the "Designed DWT" column in the SMPA table (SMPA provides DWT explicitly).
- `equipment`: only populated where SMPA explicitly lists mechanisation (e.g., Berth 3 and Berth 4 are marked Mechanized in the table).
- `handling_rate_mt_hr` and `annual_capacity_mt`: left blank unless explicitly provided (none provided per berth in the SMPA table).
- `max_beam_m`: left blank (not provided in authoritative table).

Important Haldia operational notes
---------------------------------

- Haldia is a riverine/tidal port on the Hooghly River. The Administrative Report lists both Designed/Draft and Present Depth (2024-25). Present Depth values reflect in-situ depths and may vary with maintenance dredging and tidal conditions. These Present Depth values are recorded in `special_restrictions` for each berth.
- The dataset does NOT use port throughput (e.g., 49.54 MMT for 2023-24 or 47.31 MMT for 2024-25) as `annual_capacity_mt`. Throughput figures are documented in the README as context only.
- Some berths have ongoing redevelopment or mechanisation projects referenced in SMPA documents; project proposals were not treated as existing infrastructure and therefore were not added as separate berth rows.

Files changed
-------------

- Updated: `data/processed/ports/ports_master.csv` — added one `HALDIA` port row with structural notes and SMPA Administrative Report as source.
- Updated: `data/processed/ports/port_berths.csv` — added 18 `HALDIA` berth/jetties rows from SMPA Administrative Report Table I (C).

Validation checklist performed
----------------------------

- CSV headers preserved.
- Exactly 1 `HALDIA` port row added to `ports_master.csv`.
- Exactly 18 `HALDIA` berth rows added to `port_berths.csv`.
- All numeric fields are numeric or left blank; no whitespace-only numeric fields.
- Every `HALDIA` row includes `source_url` and `source_date` referencing the Administrative Report (2024-25).
- Existing ports (Paradip, Visakhapatnam, Gopalpur, Dhamra, Gangavaram) were not modified.

If you want me to: run additional spot checks (unique berth names, numeric parsing), or adjust any field formatting (e.g., change `source_date` to an access-date string), tell me which one and I'll proceed. I did not commit or push these changes.
