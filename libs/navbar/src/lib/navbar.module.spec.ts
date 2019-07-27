import { async, TestBed } from '@angular/core/testing'
import { NavbarModule } from './navbar.module'

describe('NavbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NavbarModule]
    }).compileComponents()
  }))

  it('should create', () => {
    expect(NavbarModule).toBeDefined()
  })
})
