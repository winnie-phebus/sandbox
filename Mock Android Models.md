Tech Plan Changes

- Updated code blocks to format based on the correct language (instead of defaulting to none or kotlin - JSON blocks are JSON, iOS impls are Swift etc)
- Added Android Implementation Models:
  - Data Streak Card (as DataStreakTile)
  - ReferralsTile
- Proposed we add 2 new icons to the DesignSystem/ WhoopIconMapper to represent "COMPLETE_CHECKMARK" and "PENDING_CHECKMARK"
  - ![alt text](image.png)
  - will add tickets on Mobile for this
- Updated instances where the levels image included the now-defunct "header" field

``` kotlin
data class DataHighlight
```
