import { async, TestBed } from '@angular/core/testing'
import { CustomDirectivesModule } from './custom-directives.module'

describe('CustomDirectivesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomDirectivesModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(CustomDirectivesModule).toBeDefined()
  })
})
