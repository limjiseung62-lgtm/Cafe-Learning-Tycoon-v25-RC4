import { growthAlbum } from './villageGrowthVisual.js?v=2.5.0-rc.4-d6835d141692';
import { addCafeMemory } from './managementState.js?v=2.5.0-rc.4-d6835d141692';
import { recruitById } from './recruitConfig.js?v=2.5.0-rc.4-d6835d141692';
import { researchRecipes } from './menuResearch.js?v=2.5.0-rc.4-d6835d141692';
export function syncManagementAlbum(save) { if (!save.management)
    return; const list = save.managementAlbum ??= [], cafeId = save.portfolio?.activeCafeId ?? 'cafe-1', m = save.management, at = save.updatedAt; const add = (id, kind, label, reward = '', level = save.cafeLevel) => addCafeMemory(list, { id: cafeId + ':' + id, kind, cafeId, label, at, level, reward }); add('founding', 'founding', cafeId === 'cafe-1' ? '나의 첫 카페' : '호숫가 2호점 창업', '', 1); for (const level of save.longTerm?.albums ?? [])
    add('level:' + level, 'founding', '카페 ' + level + '단계의 추억', '기존 성장 앨범에서 연결', level); if (save.growthBranch?.selected)
    add('branch', 'branch', '성장 분기 · ' + ({ garden: '정원 카페', bakery: '베이커리 카페', dessert: '디저트 카페' }[save.growthBranch.selected])); if (save.specialization?.selected)
    add('specialization', 'specialization', '전문화 · ' + save.specialization.selected); for (const staff of save.roster?.owned ?? [])
    add('staff:' + staff.id, 'staff', recruitById(staff.id).name + ' 채용'); for (const r of researchRecipes)
    if (m.research[r.id]?.stage === 'registered')
        add(r.id, 'recipe', r.name + ' 개발'); if (Object.values(m.regulars).some(r => r.loyal))
    add('regular', 'regular', '첫 단골과의 약속'); for (const [id, t] of Object.entries(m.training))
    for (const badge of t.badges)
        add(badge, 'training', recruitById(id).name + ' 교육 ' + badge.split(':').at(-1) + '단계', '기념 배지'); for (const h of m.businessHistory)
    if (h.success)
        add('strategy:' + h.id, 'business', '영업 목표 달성 · ' + h.strategy); for (const d of m.deliveries)
    if (d.status === 'delivered')
        add(d.id, 'business', d.resident + '에게 배달 완료', '배달 기념 카드'); for (const r of save.miniCollection?.receipts ?? [])
    if (r.outcome === 'success')
        add('mini:' + r.id, 'record', r.kind + ' 미니게임 성공'); for (const [kind, records] of Object.entries({ ...save.miniCollection?.arcadeRecords, ...save.miniCollection?.craftRecords }))
    for (const [difficulty, score] of Object.entries(records ?? {}))
        add('best:' + kind + ':' + difficulty + ':' + score, 'record', kind + ' ' + difficulty + ' 최고 기록 ' + score); for (const item of save.village?.progression ? growthAlbum({ stage: save.village.progression.stage, seenStage: save.village.progression.seenStage }) : [])
    add('village:' + item.stage, 'village', '마을 발전 ' + item.stage + '단계', '기존 마을 앨범 연결'); if (save.portfolio?.founded)
    add('second', 'second', '호숫가 2호점과 함께'); }
