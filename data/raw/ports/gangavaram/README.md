Gangavaram port - raw sources and extraction notes
===============================================

Primary authoritative source
---------------------------

- Gangavaram Berthing Policy & Tariff Structure (BPTS) — effective 01 October 2025
  - URL: https://www.adaniports.com/-/media/Project/Ports/PortsAndTerminals/Gangavaram-Port/Tariff/Berthing-Policy-and-Tariff-structure-2025-26.pdf
  - Effective date: 01 October, 2025
  - Treated as the authoritative source for berth-level designed parameters (LOA, designed depth, permissible draft, berth length, displacement) and berth allocation/policy.

Other official/contextual sources
--------------------------------

- Adani Gangavaram Port operator page: https://www.adaniports.com/ports-and-terminals/gangavaram-port (accessed 07 September, 2026)
- Adani operational performance/ports 2026 (contextual capacity/throughput): https://www.adaniports.com/digital-reports/ports/2026/operational-performance-ports.html (accessed 07 September, 2026)

Port-level values extracted
--------------------------

- `port_id`: GANGAVARAM
- `port_name`: Gangavaram Port
- `state`: Andhra Pradesh
- `port_type`: Private Port (operator: Adani Ports)
- `annual_capacity_mt`: 60000000 (60,000,000) — taken from Gangavaram BPTS (effective 01 Oct 2025) which states port capacity 60 MMTPA. Note: Adani operational performance page lists 64 MMT; both are official — BPTS is primary for static berth/port parameters so 60 MMTPA is used here and the discrepancy is documented below.
- `max_dwt_mt`: 200000 (maximum vessel size reported in BPTS)
- `max_draft_m`: 19.5 (used as port-level maximum berth water depth because BPTS documents berths up to 19.5 m)
- `channel_depth_m`: 20.2 (harbour depth reported in BPTS)
- `notes`: port-level summary including 9 berths and mechanisation notes per BPTS
- `source_url` / `source_date`: BPTS PDF (01 October, 2025)

Berth-level values extracted (from BPTS)
-------------------------------------

Added nine berths B1..B9. For each berth we recorded only fields explicitly supported by the BPTS:

- B1: max_loa_m=230; berth_length_m=275; max_draft_m=13.0; displacement=65,000 MT recorded in `special_restrictions`.
- B2: max_loa_m=230; berth_length_m=280; max_draft_m=14.5; displacement=98,000 MT recorded in `special_restrictions`.
- B3: max_loa_m=230; berth_length_m=280; max_draft_m=15.0; displacement=98,000 MT recorded in `special_restrictions`.
- B4: max_loa_m=300; berth_length_m=340; max_draft_m=18.0; displacement=236,000 MT in `special_restrictions`; priority: Iron Ore Fines / Pellets.
- B5: max_loa_m=292; berth_length_m=320; max_draft_m=18.0; displacement=236,000 MT; priority: Coal / Coke; equipment: Mechanised coal terminal (per BPTS statement about mechanised coal berths).
- B6: max_loa_m=300; berth_length_m=355; max_draft_m=18.0; displacement=236,000 MT; priority: Coal / Coke; equipment: Mechanised coal terminal.
- B7: max_loa_m=200; berth_length_m=235; max_draft_m=14.5; displacement=98,000 MT.
- B8: max_loa_m=230; berth_length_m=275; max_draft_m=14.5; displacement=98,000 MT.
- B9: berth_length_m=337; designed depth 15.5 m; displacement 98,000 MT; BPTS contains split conditions for container vs non-container operations — permissible draft and LOA differ by vessel category. To avoid inventing a single value, we left ambiguous numeric fields for B9 blank and documented the split-condition in `special_restrictions`.

Fields intentionally left blank and why
------------------------------------

- `max_beam_m`: not provided by BPTS per berth — left blank.
- `max_dwt_mt` (berth-level): BPTS provides displacement, not DWT — do not convert; left blank.
- `handling_rate_mt_hr` and berth `annual_capacity_mt`: not provided in berth-specific form — left blank.
- `equipment`: only populated where BPTS explicitly ties mechanisation to the berth (B5/B6 mechanised coal berths). Other equipment details are port-level and not mapped onto individual berths here.
- For B9, `max_loa_m` and `max_draft_m` left blank because the source provides separate conditions for container and non-container operations; these are noted in `special_restrictions`.

Conflict noted and decision
--------------------------

- BPTS (01 Oct 2025) states port capacity 60 MMTPA. The Adani operational performance page (2026) presents a 64 MMT capacity figure. Both are official; to keep static, versioned provenance clear I used the BPTS (01 Oct 2025) value for `annual_capacity_mt` and documented the 64 MMT figure as a later official figure in this README. If you prefer the 64 MMT figure as the static port capacity, I can update the CSV and document the reason.

B9 split-condition handling
--------------------------

- The BPTS provides separate permissible draft and LOA rules for B9 depending on container vs non-container operations. Rather than invent a single permissive numeric, I recorded `berth_length_m` (337 m) which is unambiguous and placed the conditional rules and the displacement (98,000 MT) in `special_restrictions`. This preserves the source nuance and avoids misrepresenting operational limits.

Limitations
-----------

- Monthly draft declarations may change permissible drafts — the BPTS notes these are promulgated separately; static `max_draft_m` entries reflect the BPTS permissible draft where unambiguous, otherwise left blank.
- Beam and detailed equipment counts per berth are not present in BPTS and so are omitted.

If you want me to instead adopt the 64 MMT capacity from the Adani operational page as the port-level `annual_capacity_mt`, say so and I'll update the CSV and README accordingly (not committed).
